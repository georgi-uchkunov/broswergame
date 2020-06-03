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
public class AdminShopController {

	@GetMapping("/admin_shop")
	public String redirectToAdminShop() {
		return "admin_shop";
	}
	
}

