const level3 = {
  preset: [
    {xVal: 160, yVal: 200, pieceValue: 3},
    {xVal: 240, yVal: 160, pieceValue: 4},
    {xVal: 320, yVal: 240, pieceValue: 2},
    {xVal: 120, yVal: 80, pieceValue: 4},
    {xVal: 80, yVal: 40, pieceValue: 5},
  ],
  user: {
    1: {xVal: null, yVal: null, pieceValue: 1, img: "app/assets/images/jellyfish.png"},
    2: {xVal: null, yVal: null, pieceValue: 5, img: "app/assets/images/greatwhite.png"},
    3: {xVal: null, yVal: null, pieceValue: 6, img: "app/assets/images/bluewhale.png"}
  },
  goal: {xVal: 0, yVal: 320},
  levelNum: 3,
  catch: {value: 1, img: "app/assets/images/jellyfish.png"}
}

export default level3;
