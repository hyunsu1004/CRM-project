package demo.crm.controller;

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

}
