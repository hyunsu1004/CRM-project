package demo.crm.controller;

import demo.crm.domain.Member;
//import demo.crm.service.JoinService;
import demo.crm.dto.LoginDto;
import demo.crm.service.MemberService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import lombok.RequiredArgsConstructor;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class MemberController {

    private final MemberService memberService;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/api/signup")
    public String saveMemberV2(@RequestBody @Valid CreateMemberRequest request) {
        Member member = new Member();
        member.setEmail(request.getEmail());

        String enPw = passwordEncoder.encode(request.getPassword());
        member.setPassword(enPw);
        member.setName(request.getUsername());
        member.setPhone(request.getPhone());

        memberService.join(member);
        return "회원가입 완료";
    }

    @PostMapping("/login")
    public String loginMember(@RequestBody @Valid LoginDto loginDto) {

        boolean validated = memberService.validLoginMember(loginDto);
        if (!validated) {
            throw new IllegalStateException("잘못된 비밀번호!");
        }
        return "success";

    }

    @Data
    static class CreateMemberRequest {
        @NotEmpty
        private String email;
        @NotEmpty
        private String password;
        @NotEmpty
        private String username;
        @NotEmpty
        private String phone;
    }

    @Data
    static class LoginMemberRequest {
        @NotEmpty
        private String email;
        @NotEmpty
        private String password;
    }
}
