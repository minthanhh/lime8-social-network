import { authMiddleware } from '#Global/helpers/authen-middlewares';
import { Update } from '#User/controllers/change-password';
import { Get } from '#User/controllers/get-profile';
import { Search } from '#User/controllers/search-user';
import { Edit } from '#User/controllers/update-info';
import { UpdateSettings } from '#User/controllers/update-setting';
import express, { Router } from 'express';

class UserRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }
  public routes(): Router {
    this.router.get('/user/profile/search/:query', authMiddleware.checkAuthentication, Search.prototype.user);
    this.router.get('/user/profile/all/:userId', authMiddleware.checkAuthentication, Get.prototype.profileByUserId);
    this.router.get('/user/profile/list-all/:page', authMiddleware.checkAuthentication, Get.prototype.all);
    this.router.get('/user/profile', authMiddleware.checkAuthentication, Get.prototype.profile);
    this.router.get('/user/profile/posts/:username/:userId/:uId', authMiddleware.checkAuthentication, Get.prototype.profileAndPosts);
    this.router.get('/user/profile/suggestions', authMiddleware.checkAuthentication, Get.prototype.randomUserSuggestions);

    this.router.put('/user/profile/change-password', authMiddleware.checkAuthentication, Update.prototype.password);
    this.router.put('/user/profile/basic-info', authMiddleware.checkAuthentication, Edit.prototype.info);
    this.router.put('/user/profile/social-links', authMiddleware.checkAuthentication, Edit.prototype.social);
    this.router.put('/user/profile/settings', authMiddleware.checkAuthentication, UpdateSettings.prototype.notification);

    return this.router;
  }
}
export const userRoutes: UserRoutes = new UserRoutes();
