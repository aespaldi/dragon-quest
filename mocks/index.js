const callHumanMock = {
  id: 1,
  type: "Got Lost",
  level: 1,
  currenthp: 10,
  maxhp: 10,
  strength: 5,
  defense: 5,
  imageurl: "/images/human1.png"
}


const allDragonsMock =
  [
    {
      id: 1,
      type: "red",
      level: 1,
      currenthp: 20,
      maxhp: 20,
      strength: 10,
      defense: 7,
      imageurl: "/images/dragon_red.png"
    },
    {
      id: 2,
      type: "blue",
      level: 1,
      currenthp: 22,
      maxhp: 22,
      strength: 7,
      defense: 10,
      imageurl: "/images/dragon_blue.png"
    },
    {
      id: 3,
      type: "yellow",
      level: 1,
      currenthp: 15,
      maxhp: 15,
      strength: 15,
      defense: 8,
      imageurl: "/images/dragon_yellow.png"
    },
    {
      id: 4,
      type: "purple",
      level: 2,
      currenthp: 27,
      maxhp: 27,
      strength: 14,
      defense: 14,
      imageurl: "/images/dragon_purple.png"
    },
    {
      id: 5,
      type: "green",
      level: 2,
      currenthp: 24,
      maxhp: 24,
      strength: 14,
      defense: 12,
      imageurl: "/images/dragon_green.png"
    },
    {
      id: 6,
      type: "orange",
      level: 2,
      currenthp: 23,
      maxhp: 13,
      strength: 16,
      defense: 12,
      imageurl: "/images/dragon_orange.png"
    },
    {
      id: 7,
      type: "indigo",
      level: 3,
      currenthp: 32,
      maxhp: 32,
      strength: 15,
      defense: 16,
      imageurl: "fakeUrl.com/fake.png"
    },
    {
      id: 8,
      type: "magenta",
      level: 3,
      currenthp: 31,
      maxhp: 31,
      strength: 16,
      defense: 16,
      imageurl: "fakeUrl.com/fake.png"
    },
    {
      id: 9,
      type: "lavendar",
      level: 3,
      currenthp: 25,
      maxhp: 25,
      strength: 20,
      defense: 26,
      imageurl: "fakeUrl.com/fake.png"
    }
  ];

  const getRandomDragonMock = {
    randomDragon: {
      id: 3,
      type: "yellow",
      level: 1,
      currenthp: 15,
      maxhp: 15,
      strength: 15,
      defense: 8,
      imageurl: "/images/dragon_yellow.png"
    }
  }

module.exports = { allDragonsMock, callHumanMock, getRandomDragonMock };
