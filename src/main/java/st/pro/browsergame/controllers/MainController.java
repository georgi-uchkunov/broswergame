package st.pro.browsergame.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;


/**
 * Basic view controller to enable reaching the main page
 * @author GU
 */
@Controller
public class MainController {

	@GetMapping("/")
    public String redirectToMainPage() {
        return "main";
    }
}