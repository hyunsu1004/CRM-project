package demo.crm.service;

import demo.crm.entity.Member;
import demo.crm.dto.LoginDto;

import demo.crm.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;


    // 회원 가입
    @Transactional
    public Long join(Member member) {
        Boolean isExist = memberRepository.existsByEmail(member.getEmail());
        if (isExist) {
            throw new IllegalStateException("중복된 EMAIL 입니다.");
        }
        member.setRole("ROLE_ADMIN");
        memberRepository.save(member);
        return member.getMemberId();
    }



    public boolean validLoginMember(LoginDto loginDto) {
        Member member = memberRepository.findByEmail(loginDto.getEmail())
                .orElseThrow(()-> new IllegalStateException("User not found with id: " + loginDto.getEmail()));
        if (passwordEncoder.matches(loginDto.getPassword(), member.getPassword())) {
            return true;
        } else {
            return false;
        }
    }

    public Member findByEmail(String email) {
        return memberRepository.findByEmail(email).orElse(null);
    }

}
