package st.pro.browsergame.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Basic view controller to enable reaching user comments page
 * 
 * @author GU
 */
@Controller
public class UserCommentsController {

	@GetMapping("/user_comments")
	public String redirectToUserCommentsPage() {
		return "user_comments";
	}

}