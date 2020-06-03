/**
 * 
 */
package st.pro.browsergame.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Basic view controller to enable reaching profile page
 * @author IL
 */
@Controller
public class UserController {
	@GetMapping("/profile")
    public String redirectToMainPage() {
        return "profile";
    }
}
