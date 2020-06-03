package st.pro.browsergame;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import st.pro.browsergame.models.Role;
import st.pro.browsergame.models.User;
import st.pro.browsergame.repos.RoleRepository;
import st.pro.browsergame.repos.UserRepository;

@Component
public class DataGenerator {
	private RoleRepository roleRepository;
	private UserRepository userRepository;

	@Autowired
	public DataGenerator(RoleRepository roleRepository, UserRepository userRepository) {
		this.roleRepository = roleRepository;
		this.userRepository = userRepository;
	}

	@PostConstruct
	public void loadData() {
		if (userRepository.count() == 0) {
			User admin = new User();
			admin.setEmail("admin@admin.com");
			admin.setPassword("admin");
			admin.setUsername("admin");
			Role adminRole = new Role();
			adminRole.setCode("ADMIN");
			admin.addRole(roleRepository.save(adminRole));
			userRepository.save(admin);
		}
	}

}
