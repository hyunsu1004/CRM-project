package com.backend.demo.service;

import com.backend.demo.dto.CustomUserDetails;
import com.backend.demo.entity.Member;
import com.backend.demo.repository.MemberRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final MemberRepository memberRepository;
    public CustomUserDetailsService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        //DB에서 조회
        Member userData = memberRepository.findByEmail(email);

        if (userData != null) {
            // 이메일로 사용자를 찾을 수 없을 때 예외 발생
            return new CustomUserDetails(userData);
        }

        // UserDetails에 담아서 반환, AuthenticationManager가 이를 검증
//        return new CustomUserDetails(userData.get());
        return null;
    }


}
