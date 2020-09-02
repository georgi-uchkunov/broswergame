/**
 * 
 */
package st.pro.browsergame.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * @author Pc
 *
 */
@Controller
public class UserPurchasesController {

	@GetMapping("/user_purchases")
	public String redirectToUserPurchasesPage() {
		return "user_purchases";
	}
	
}
