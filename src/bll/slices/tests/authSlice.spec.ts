import { authTestReducer} from "../authSlice";
import {isThereErrorOnLogin} from "../authSlice";

describe('reducer should auth user', () => {
    it('auth user', () => {
        const startState = { loginError: false}
        const action = isThereErrorOnLogin(true)
        const endState = authTestReducer(startState, action)
        expect(endState.loginError).toBe(true)

    })
})
