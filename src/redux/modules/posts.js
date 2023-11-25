// ACTION VALUE
const ADD_POST = "ADD_POST"

// ACTION VALUE CREATOR
export const addPost = (postObj) => {
  return { type: ADD_POST, payload: postObj }
}

// INITIAL STATE
const initialState = [

  // {
  //   "subtitle": "글 제목2",
  //   "createdAt": {
  //     "seconds": 1700578800,
  //     "nanoseconds": 297000000
  //   },
  //   "title": "글 제목1",
  //   "content": "본문 내용~~~",
  //   "categoryCode": "0001",
  //   "username": "kim"
  // },
  // {
  //   "title": "게시물 2",
  //   "subtitle": "부제 2",
  //   "categoryCode": "0002",
  //   "content": "본문내용~!@!@!@!@@~!~!~!~!~!~!~!~!~!",
  //   "username": "lee",
  //   "createdAt": {
  //     "seconds": 1700578800,
  //     "nanoseconds": 780000000
  //   }
  // },
  // {
  //   "content": "잔디가 펼쳐져서 아주아주 멋있고 초록초록 해서 기부니가 좋아지는 카페였어용",
  //   "title": "최고여따..",
  //   "categoryCode": "0002",
  //   "subtitle": "잔디가 펼쳐진..",
  //   "username": "꼬미삼툔",
  //   "createdAt": {
  //     "seconds": 1700578800,
  //     "nanoseconds": 408000000
  //   }
  // },
  // {
  //   "content": "내용!!!!!~~~~~~~~~~~",
  //   "username": "호두마미",
  //   "categoryCode": "0001",
  //   "subtitle": "역대급..!",
  //   "title": "가을 산책로 추천!!",
  //   "createdAt": {
  //     "seconds": 1700578800,
  //     "nanoseconds": 127000000
  //   }
  // }

];

// REDUCER
export const posts = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return state = [action.payload, ...state]
    default:
      return state;
  }
}

