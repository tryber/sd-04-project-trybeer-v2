/** sideBarHide REDUX */

/** Actions Types */

export const Types = {
  CHANGE_VISIBILITY: 'CHANGE_VISIBILITY',
};

/** Reducers */

const initialState = {
  isVisible: false,
};

const sideBarHideReducer = (state = initialState, { type }) => {
  switch (type) {
    case Types.CHANGE_VISIBILITY:
      return {
        ...state,
        isVisible: !state.isVisible,
      };
    default:
      return state;
  }
};

/** Actions */

export const changeVisibility = () => ({
  type: Types.CHANGE_VISIBILITY,
});

export default sideBarHideReducer;
