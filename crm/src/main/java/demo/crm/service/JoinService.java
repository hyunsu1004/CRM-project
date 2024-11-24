//package demo.crm.service;
//
//import demo.crm.domain.Member;
//import demo.crm.repository.UserRepository;
//import org.springframework.stereotype.Service;
//
//@Service
//public class JoinService {
//
//    private final UserRepository userRepository;
//
//    public JoinService(UserRepository userRepository) {
//        this.userRepository = userRepository;
//    }
//
//    public void joinProcess(Member member) {
//        Boolean isexist = userRepository.existsByEmail(member.getEmail());
//        if (isexist) {
//            throw new IllegalStateException("중복된 EMAIL 입니다.");
//
//        }
//        member.setRole("ROLE_ADMIN");
//
//        userRepository.save(member);
//    }
//}
