/**
 * 
 */
package st.pro.browsergame.security;

/**
 * Base spring security config class
 * 
 * @author
 *
 */
/*
 * @Configuration
 * 
 * @EnableWebSecurity
 * 
 * @EnableGlobalMethodSecurity( securedEnabled = true, prePostEnabled = true,
 * jsr250Enabled = true )
 */
public class SecurityConfig {//extends WebSecurityConfigurerAdapter {
	/*
	 * 
	 * @Autowired private UserDetailsService userDetailsService; // @Autowired //
	 * private PasswordEncoder passwordEncoder;
	 * 
	 * 
	 * // @Autowired // public SecurityConfig(ApplicationDetailsService
	 * userDetailsService // ,PasswordEncoder passwordEncoder) { //
	 * this.userDetailsService =userDetailsService; // this.passwordEncoder
	 * =passwordEncoder; // }
	 * 
	 * @Bean public AuthenticationProvider authProvider() {
	 * 
	 * DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
	 * provider.setUserDetailsService(userDetailsService);
	 * provider.setPasswordEncoder(new BCryptPasswordEncoder()); return provider;
	 * 
	 * }
	 * 
	 * @Override protected void configure(HttpSecurity http) throws Exception {
	 * http.authorizeRequests() .antMatchers("/**").permitAll()
	 * .requestMatchers(EndpointRequest.toAnyEndpoint()).permitAll()
	 * .and().csrf().disable();
	 * 
	 * 
	 * .csrf().disable() .authorizeRequests().antMatchers("/**").permitAll()
	 * .anyRequest().authenticated() .and() .formLogin() .loginPage("/").permitAll()
	 * .and() .logout().invalidateHttpSession(true) .clearAuthentication(true)
	 * .logoutRequestMatcher(new AntPathRequestMatcher("/"))
	 * .logoutSuccessUrl("/").permitAll();
	 * 
	 * 
	 * // .authorizeRequests() // .antMatchers("/**").permitAll() //
	 * .requestMatchers(EndpointRequest.toAnyEndpoint()).permitAll() //
	 * .and().csrf().disable();
	 * 
	 * }
	 * 
	 * 
	 * 
	 * // @Override // protected void configure(AuthenticationManagerBuilder auth)
	 * // throws Exception { // super.configure(auth); //
	 * auth.userDetailsService(userDetailsService) //
	 * .passwordEncoder(passwordEncoder); // // }
	 * 
	 */}
