/**
 * 
 */
package st.pro.browsergame.rest;

import javax.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import st.pro.browsergame.models.User;

/**
 * Rest controller for receiving User info, depending on current logged in user
 * @author IL
 */
@RestController
public class UserInfoRest {

	@GetMapping("/getCurrentUser")
	public User getCurrentUser(final HttpSession session) {
		return (User) session.getAttribute("currentUser");
	}
}