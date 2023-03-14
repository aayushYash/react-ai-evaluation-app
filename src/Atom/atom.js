import { atom, selector } from "recoil"

const selectedTypeOfUser = atom({
    key: 'type',
    default: 'Student'
})

const userState = selector({
    key: 'userState', // unique ID (with respect to other atoms/selectors)
    get: ({get}) => {
      const userSelected = get(selectedTypeOfUser);
  
      return userSelected;
    },
  });

export {userState, selectedTypeOfUser}