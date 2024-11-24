package demo.crm.service;

import demo.crm.entity.Member;

import demo.crm.repository.MemberRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.Assert.*;


@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class MemberServiceTest {
    @Autowired MemberService memberService;
    @Autowired
    MemberRepository memberRepository;

//    @Test
//    public void MemberServiceTest() throws Exception {
//        //given
//        Member member = new Member();
//        member.setEmail("kim.gmail.com");
//
//        //when
//        Long savedId = memberService.join(member);
//
//        //then
//        assertEquals(member, memberRepository.findById(savedId));
//    }

    @Test(expected = IllegalStateException.class)
    public void 중복_회원_예외() throws Exception {
        //given
        Member member1 = new Member();
        member1.setEmail("kang");

        Member member2 = new Member();
        member2.setEmail("kang");

        //when
        memberService.join(member1);
        memberService.join(member2);

        //then
        fail("예외가 발생해야 한다.");
    }


}