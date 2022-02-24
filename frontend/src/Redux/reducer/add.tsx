import { strictEqual } from "assert";

export interface AddImage {
    name: string;
    img: string;
}

interface Action {
    type: string;
    data: AddImage[] | AddImage;
}

const initialState: AddImage[] | AddImage = [];


export const ADD_ACTION = "add";


const add = (state = initialState, action: Action): AddImage[] => {
    switch (action.type) {
        case 'add':
            if (Array.isArray(action.data)) {
                return [...state, ...action.data];
            } else {
                return [action.data, ...state];
            }
        default:
            return state;
    }
}
export default add;