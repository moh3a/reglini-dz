// MODULE USED TO PERSIST THE REDUX STATE IN LOCAL STORAGE

export const loadState = () => {
  try {
    if (typeof window !== "undefined") {
      const serializedState = sessionStorage.getItem("regliniState");
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    }
  } catch (error) {
    return undefined;
  }
};

export const saveState = (state: any) => {
  try {
    if (typeof window !== "undefined") {
      const serializedState = JSON.stringify(state);
      sessionStorage.setItem("regliniState", serializedState);
    }
  } catch (error) {
    return;
  }
};
