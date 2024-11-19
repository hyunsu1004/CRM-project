package demo.crm.service;

import demo.crm.domain.Member;
import demo.crm.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;


    // 회원 가입
    @Transactional
    public Long join(Member member) {
        validateDuplicateMember(member);
        memberRepository.save(member);
        return member.getMember_id();
    }

    private void validateDuplicateMember(Member member) {
        List<Member> findMembers = memberRepository.findByEmailForValidation(member.getEmail());
        if (!findMembers.isEmpty()) { // 중복된 ID가 있는 경우
            throw new IllegalStateException("중복된 EMAIL 입니다.");
        }
    }

}
