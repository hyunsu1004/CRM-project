package demo.crm.controller;

import demo.crm.dto.EmailCheckDto;
import demo.crm.dto.EmailRequestDto;
import demo.crm.service.EmailSendService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class EmailController {

    private final EmailSendService emailSendService;

//    @GetMapping("/simple")
//    public void sendSimpleMail() {
//        mailService.sendMailMessage();
//    }

    @PostMapping("/signup/email")
    public Map<String, String> mailSend(@RequestBody @Valid EmailRequestDto emailRequestDto) {
        String code = emailSendService.joinEmail(emailRequestDto.getEmail());
        // response를 json으로 반환
        Map<String, String> response = new HashMap<>();
        response.put("code", code);

        return response;
    }

    /**
     * Email Auth: 인증번호 입력 후 인증 버튼 click 123
     */
    @PostMapping("/signup/emailAuth")
    public String authCheck(@RequestBody @Valid EmailCheckDto emailCheckDto) {
        Boolean checked = emailSendService.checkAuthNum(emailCheckDto.getEmail(), emailCheckDto.getAuthNum());
        if (checked) {
            return "이메일 인증 성공!";
        }
        else {
            throw new NullPointerException("이메일 인증 실패!");
        }
    }

}
