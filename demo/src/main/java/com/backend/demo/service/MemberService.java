package com.backend.demo.service;

import com.backend.demo.dto.LoginDto;
import com.backend.demo.entity.Member;
import com.backend.demo.repository.MemberRepository;
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
    public int join(Member member) {
        Boolean isExist = memberRepository.existsByEmail(member.getEmail());
        if (isExist) {
            throw new IllegalStateException("중복된 EMAIL 입니다.");
        }
        member.setRole("ROLE_ADMIN");
        memberRepository.save(member);
        return member.getId();
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
