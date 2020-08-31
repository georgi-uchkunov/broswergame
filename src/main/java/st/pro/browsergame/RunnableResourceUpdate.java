package st.pro.browsergame;

import st.pro.browsergame.rest.UserInfoRest;

public class RunnableResourceUpdate implements Runnable {

	public void run() {
		UserInfoRest userInfoRest = new UserInfoRest();
		userInfoRest.updateCrystalsForAllUsers();
	}
}