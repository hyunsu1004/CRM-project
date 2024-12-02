package com.backend.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/api/login", "/", "/api/signup", "/signup/email", "/signup/email", "/signup/emailAuth","/crawl","/api/company","/api/attribute","/api/user/attribute","api/user/attributes","/api/{attributeId}",
                                "/api/member/startups","/api/member/investors","/investors","/api/member/startups","/api/member/startups/interest/update","/api/member/startups/interest",
                                "/api/member/adddeals","/api/deals","/api/member/notes","/api/member/notes/{id}","/api/member/deals/{id}/notes",
                                "/api/member/deals/{id}","api/member/deals/notes/{dealId}","/notes/{dealId}", "/api/member/{memberId}/deals", "/api/member/{memberId}/deals/addattributes", "/api/member/{memberId}/deals/addattributes", "/api/member/{memberId}/deals/{dealId}/attributes/{attributeId}/addValue", "/api/member/adddeals").permitAll()
                        .anyRequest().authenticated()
                )
                .formLogin(login -> login.disable());

        return http.build();
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {

        return new BCryptPasswordEncoder();
    }
}









//
////import demo.crm.jwt.LoginFilter;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.http.SessionCreationPolicy;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
//
//
//@Configuration
//@EnableWebSecurity
//public class SecurityConfig {
//
//    //AuthenticationManager가 인자로 받을 AuthenticationConfiguraion 객체 생성자 주입
//    private final AuthenticationConfiguration authenticationConfiguration;
//
//    public SecurityConfig(AuthenticationConfiguration authenticationConfiguration) {
//
//        this.authenticationConfiguration = authenticationConfiguration;
//    }
//
//    //AuthenticationManager Bean 등록
//    @Bean
//    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
//
//        return configuration.getAuthenticationManager();
//    }
//
//    @Bean
//    public BCryptPasswordEncoder bCryptPasswordEncoder() {
//
//        return new BCryptPasswordEncoder();
//    }
//
//
//    @Bean
//    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//        //csrf disable
//        http
//                .csrf((auth) -> auth.disable());
//
//        //From 로그인 방식 disable
//        http
//                .formLogin((auth) -> auth.disable());
//
//        //http basic 인증 방식 disable
//        http
//                .httpBasic((auth) -> auth.disable());
//
//        //경로별 인가 작업
//        http
//                .authorizeHttpRequests((auth) -> auth
//                        .requestMatchers("/login", "/", "/api/signup", "/signup/email").permitAll()
//                        .requestMatchers("/admin").hasRole("ADMIN")
//                        .anyRequest().authenticated());
//
//        http
//                .addFilterAt(new LoginFilter(authenticationManager(authenticationConfiguration)), UsernamePasswordAuthenticationFilter.class);
//
//        //세션 설정
//        http
//                .sessionManagement((session) -> session
//                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS));
//
//        return http.build();
//    }
//}
