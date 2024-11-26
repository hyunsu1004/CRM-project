package com.backend.demo.controller;

//import demo.crm.service.JoinService;
import com.backend.demo.dto.LoginDto;
import com.backend.demo.dto.MemberInfoResponse;
import com.backend.demo.dto.MemberInfoResponse;
import com.backend.demo.entity.Member;
import com.backend.demo.entity.Startup;
import com.backend.demo.repository.CompanyRepository;
import com.backend.demo.repository.MemberRepository;
import com.backend.demo.service.MemberService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import lombok.RequiredArgsConstructor;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class MemberController {

    private final MemberService memberService;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/api/signup")
    public String saveMemberV2(@RequestBody @Valid CreateMemberRequest request) {
        Member member = new Member();
        String email = request.getEmailName() +"@"+ request.getEmailDomain();
        member.setEmail(email);

        String enPw = passwordEncoder.encode(request.getPassword());
        member.setPassword(enPw);
        member.setName(request.getName());
        member.setPhone(request.getPhonenum());

        memberService.join(member);
        return "회원가입 완료";
    }

    @PostMapping("/api/check-email")
    public CheckEmailResponse checkEmail(@RequestBody @Valid CheckEmailRequest request) {
        String email = request.getEmailName() +"@"+ request.getEmailDomain();

        Member member = memberService.findByEmail(email);
        if (member != null) {
            throw new IllegalStateException("중복된 이메일 입니다!");
        }
        return new CheckEmailResponse(email);
    }

    @Data
    static class CheckEmailRequest {
        @NotEmpty
        private String emailName;
        @NotEmpty
        private String emailDomain;
    }

    @Data
    static class CheckEmailResponse {
        private String email;

        public CheckEmailResponse(String email) {
            this.email = email;
        }
    }

    @PostMapping("/api/login")
    public LoginMemberResponse loginMember(@RequestBody @Valid LoginDto loginDto) {

        boolean validated = memberService.validLoginMember(loginDto);
        if (!validated) {
            throw new IllegalStateException("잘못된 비밀번호!");
        }
        Member member = memberService.findByEmail(loginDto.getEmail());

        Integer id = member.getId();
        String name = member.getName();
        String email = member.getEmail();
        return new LoginMemberResponse(id,name,email);
    }

    @Autowired
    private MemberRepository memberRepository;

    //데이터 조회
    @GetMapping("/api/members")
    public List<MemberInfoResponse> getMembersInfo(){
        List<Member> members = memberRepository.findAll();
        return members.stream()
                .map(member -> {
                    MemberInfoResponse response = new MemberInfoResponse();
                    response.setId(member.getId());
                    response.setName(member.getName());
                    response.setEmail(member.getEmail());
                    return response;
                })
                .collect(Collectors.toList());
    }

//    //데이터 저장
//    @PostMapping
//    public List<Member> saveAllCompanies(@RequestBody List<Startup> companies){
//        return companyRepository.saveAll(companies);


    @Data
    static class CreateMemberRequest {
        @NotEmpty
        private String emailName;
        @NotEmpty
        private String emailDomain;
        @NotEmpty
        private String password;
        @NotEmpty
        private String name;
        @NotEmpty
        private String phonenum;

    }

    @Data
    static class LoginMemberRequest {
        @NotEmpty
        private String email;
        @NotEmpty
        private String password;
    }
    @Data
    static class LoginMemberResponse {
        private Integer id;
        private String name;
        private String email;

        public LoginMemberResponse(Integer id, String name, String email) {
            this.id = id;
            this.name = name;
            this.email = email;
        }
    }
}
