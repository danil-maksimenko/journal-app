export const INITIAL_STATE = {
  isValid: {
    post: true,
    date: true,
  },
  values: {
    post: "",
    date: "",
    tag: "",
  },
  isFormReadyToSubmit: false,
};

export function formReducer(state, action) {
  switch (action.type) {
    case "SET_VALUE":
      return { ...state, values: { ...state.values, ...action.payload } };
    case "CLEAR":
      return {
        ...state,
        values: INITIAL_STATE.values,
        isFormReadyToSubmit: false,
      };
    case "RESET_VALIDITY":
      return { ...state, isValid: INITIAL_STATE.isValid };
    case "SUBMIT": {
      const postValidity = state.values.post?.trim().length;
      const dateValidity = state.values.date;
      return {
        ...state,
        isValid: {
          post: postValidity,
          date: dateValidity,
        },
        isFormReadyToSubmit: postValidity && dateValidity,
      };
    }
  }
}
