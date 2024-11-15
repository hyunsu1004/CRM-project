package demo.crm.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class MailService {

    private final JavaMailSender mailSender;

    public void sendMailMessage() {
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();

        try {
            // 메일을 받을 수신자 설정
            simpleMailMessage.setTo("1479242@naver.com");
            // 메일 제목 설정
            simpleMailMessage.setSubject("테스트 메일 제목입니다.");
            // 메일의 내용 설정
            simpleMailMessage.setText("테스트 메일 내용내용내용입니다.");

            mailSender.send(simpleMailMessage);

            log.info("메일 발송 성공!");
        } catch (Exception e) {
            log.info("메일 발송 실패!");
            throw new RuntimeException(e);
        }
    }

}
