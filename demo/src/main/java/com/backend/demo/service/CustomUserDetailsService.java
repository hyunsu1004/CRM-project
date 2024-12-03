//package demo.crm.service;
//
//import demo.crm.domain.Member;
//import demo.crm.dto.CustomUserDetails;
//import demo.crm.repository.UserRepository;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//
//@Service
//public class CustomUserDetailsService implements UserDetailsService {
//
//    private final UserRepository userRepository;
//    public CustomUserDetailsService(UserRepository userRepository) {
//        this.userRepository = userRepository;
//    }
//
//
//    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
//
//        //DB에서 조회
//        Member userData = userRepository.findByEmail(email);
//
//        if (userData != null) {
//
//            //UserDetails에 담아서 return하면 AutneticationManager가 검증 함
//            return new CustomUserDetails(userData);
//        }
//        System.out.println("찾았습니다!");
//        return null;
//    }
//
//
//}
