import {appReducer, setIsAppFetching} from "../appSlice";


describe('fetching app', () => {
    it('fetching', () => {
        const startState = {appError: "", isAppFetching: false}
        const action = setIsAppFetching(true)
        const endState = appReducer(startState, action)
        expect(endState.isAppFetching).toBe(true)

    })
})
