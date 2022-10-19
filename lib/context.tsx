import React, {
  createContext,
  ReducerAction,
  useContext,
  useReducer,
} from 'react';

export type AuthObj = {
  firstName: string;
  lastName: string;
  email: string;
  token: string;
};

export enum ActionTypes {
  SET_AUTH = 'SET_AUTH',
  RESET = 'RESET',
}

type AuthAction = {
  type: ActionTypes;
  data: AuthObj | null;
};

type AuthState = {
  auth: AuthObj | null;
};

function reducer(state: AuthState, action: AuthAction): AuthState {
  const { type, data } = action;
  switch (type) {
    case ActionTypes.SET_AUTH:
      return {
        ...state,
        auth: data,
      };
    case ActionTypes.RESET:
      return {
        ...state,
        auth: null,
      };
    default:
      return state;
  }
}
const initialState: AuthState = {
  auth: null,
};

type AppContextInterface = {
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
};

const AppContext = createContext<AppContextInterface>({
  state: initialState,
  dispatch: () => {},
});

export function AppWrapper({ children }: React.PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}
export function useAppContext() {
  return useContext(AppContext);
}
