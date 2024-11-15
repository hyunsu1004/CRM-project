package demo.crm.controller;

import demo.crm.service.MailService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class MailController {

    private final MailService mailService;

    @GetMapping("/simple")
    public void sendSimpleMail() {
        mailService.sendMailMessage();
    }

}
