import { pageView } from '../view/page-viewer.js';


class UserController {
    print() {
        console.log("Server data is not ready");
    }
    profile(context, selector) {
        return pageView.profile(selector);
    }
}

let usersController = new UserController();
export { usersController };