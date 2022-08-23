import React, { useContext, useEffect, useRef, useState, useLayoutEffect } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Image
} from "react-native";
import generateId from "../Lib/generateId";
import { Logo } from "../components";
import { AuthenticatedUserContext } from "../providers";
import Swiper from "react-native-deck-swiper";
import {  db, Colors, Images } from "../config";
import { Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  where
} from "firebase/firestore";

export const HomeScreen = ({ navigation }) => {
  const { user } = useContext(AuthenticatedUserContext);
  const swipeRef = useRef();
  const [profiles, setProfiles] = useState([]);
  const [search, setSearch] = useState("");
  const [loaded, setLoaded] = useState(false);

    useLayoutEffect(
    () =>
      onSnapshot(doc(db, "users", user.uid), (snapshot) => {
        if (!snapshot.exists()) {
          navigation.navigate("Information");
        }
      }),
    []
  );

  useEffect(
    () =>
      onSnapshot(doc(db, "users", user.uid), (snapshot) => {
        if (snapshot.exists()) {
          setSearch(snapshot.data().lookingForJob);
        }
      }),
    []
  );

  useEffect(() => {
    let cancel = true;

    const fetchCards = async () => {
      const passes = await getDocs(
        collection(db, "users", user.uid, "passes")
      ).then((snapshot) => snapshot.docs.map((doc) => doc.id));

      const swipes = await getDocs(
        collection(db, "users", user.uid, "swipes")
      ).then((snapshot) => snapshot.docs.map((doc) => doc.id));

      const passedUserIds = passes.length > 0 ? passes : ["NotEmpty"];
      const swipedUserIds = swipes.length > 0 ? swipes : ["NotEmpty"];

      onSnapshot(
        query(
          collection(db, "users")),
        (snapshot) => {
          if (cancel) {
            setProfiles(snapshot.docs
                .filter(
                  doc =>
                    doc.data().lookingForJob !== search &&
                    doc.id !== user.uid
                )
                .filter(doc => !swipedUserIds.includes(doc.id))
                .filter(doc => !passedUserIds.includes(doc.id))
                .map(doc => ({
                  id: doc.id,
                  ...doc.data()
                })));
          }
        }
      );
    };

    fetchCards();
    console.log("refreshed")
    return () => (cancel = false);
  }, [search]);

  const swipeLeft = (cardIndex) => {
    if (!profiles[cardIndex]) return;
    const userSwiped = profiles[cardIndex];
    console.log(`You swiped Pass on ${userSwiped.displayName}`);

    setDoc(doc(db, "users", user.uid, "passes", userSwiped.id), userSwiped);
  };

  const swipeRight = async (cardIndex) => {
    if (!profiles[cardIndex]) return;

    const userSwiped = profiles[cardIndex];

    const loggedInProfile = await (
      await getDoc(doc(db, "users", user.uid))
    ).data();

    getDoc(doc(db, "users", userSwiped.id, "swipes", user.uid)).then(
      (DocumentSnapshot) => {
        if (DocumentSnapshot.exists()) {
          console.log(`Hooray you MATCHED with ${userSwiped.displayName}`);

          setDoc(
            doc(db, "users", user.uid, "swipes", userSwiped.id),
            userSwiped
          );

          setDoc(doc(db, "matches", generateId(user.uid, userSwiped.id)), {
            users: {
              [user.uid]: loggedInProfile,
              [userSwiped.id]: userSwiped
            },
            usersMatched: [user.uid, userSwiped.id],
            timestamp: serverTimestamp()
          });

          navigation.navigate("Match", {
            loggedInProfile,
            userSwiped
          });
        } else {
          console.log(
            `You swiped on ${userSwiped.displayName} (${userSwiped.job})`
          );
          setDoc(
            doc(db, "users", user.uid, "swipes", userSwiped.id),
            userSwiped
          );
        }
      }
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("SettingPage")}>
          <Ionicons name="ios-settings-outline" size={32} color="#4ade80" />
        </TouchableOpacity>

        <Text style={styles.logo}>MORE PAY</Text>

        <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
          <Ionicons name="chatbubbles-sharp" size={32} color="#4ade80" />
        </TouchableOpacity>
      </View>

      <View style={styles.swiper}>
        <Swiper
          ref={swipeRef}
          containerStyle={{ backgroundColor: "transparent" }}
          cards={profiles}
          stackSize={5}
          cardIndex={0}
          animateCardOpacity
          verticalSwipe={false}
          onSwipedLeft={(cardIndex) => {
            console.log("Swipe PASS");
            swipeLeft(cardIndex);
          }}
          onSwipedRight={(cardIndex) => {
            console.log("Swipe MATCH");
            swipeRight(cardIndex);
          }}
          overlayLabels={{
            left: {
              title: "NOPE",
              style: {
                label: {
                  textAlign: "right",
                  color: "red"
                }
              }
            },
            right: {
              title: "HIRE",
              style: {
                label: {
                  color: "#4ade80"
                }
              }
            }
          }}
          renderCard={(card) =>
            !card ? (
              <View style={styles.nocardShadow}>
                <Text style={styles.textLogo}>No more profiles</Text>

                <Logo uri={Images.emoji} />
              </View>
            ) : (
              <View key={card.id} style={styles.cardView}>
                <Image
                  style={styles.imageView}
                  source={{ uri: card.photoURL }}
                  defaultSource={Images.fetchLogo}
                />
                <View style={styles.cardShadow}>
                  <View>
                    <Text style={styles.name}>{card.displayName}</Text>
                    <Text>{card.job}</Text>
                  </View>
                  <Text style={styles.age}>{card.age}</Text>
                </View>
              </View>
            )
          }
        />
      </View>

      <View style={styles.bottom}>
        <TouchableOpacity
          style={styles.crossButton}
          onPress={() => swipeRef.current.swipeLeft()}
        >
          <Entypo name="cross" color="red" size={26} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cashButton}
          onPress={() => swipeRef.current.swipeRight()}
        >
          <MaterialCommunityIcons name="cash-fast" size={26} color="#4ade80" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  textLogo: {
    fontWeight: "700",
    paddingBottom: 10
  },
  header: {
    paddingTop: 8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  logo: {
    color: Colors.green,
    fontWeight: "700",
    fontSize: 24,
    lineHeight: 32
  },
  swiper: {
    flex: 1,
    marginTop: -3
  },
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    position: "absolute",
    bottom: 0,
    backgroundColor: "#FFF",
    width: "100%",
    height: 70,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10
  },
  nocardShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    position: "relative",
    bottom: 0,
    backgroundColor: "#FFF",
    width: "100%",
    height: "75%",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10
  },
  cardView: {
    position: "relative",
    height: "75%",
    borderRadius: 10
  },
  imageView: {
    position: "absolute",
    top: 0,
    height: "100%",
    width: "100%",
    borderRadius: 10
  },
  name: {
    fontWeight: "700",
    fontSize: 20
  },
  age: {
    fontWeight: "700",
    fontSize: 20
  },
  bottom: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  crossButton: {
    position: "absolute",
    bottom: 25,
    left: 70,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "100%",
    width: 70,
    height: 70,
    backgroundColor: "#fecaca"
  },
  cashButton: {
    position: "absolute",
    bottom: 25,
    right: 70,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "100%",
    width: 70,
    height: 70,
    backgroundColor: "#bbf7d0"
  }
});
