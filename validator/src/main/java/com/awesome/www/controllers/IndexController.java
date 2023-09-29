package com.awesome.www.controllers;

import com.awesome.www.models.ValidatorResponse;
import com.awesome.www.services.LuhnAlgo;
import com.awesome.www.utils.StringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/validator")
public class IndexController {

    @GetMapping(value = "/tokens/{token}/status", produces = "application/json")
    public ResponseEntity<?> getTokenStatus(
            @PathVariable("token") final String rawToken
    ) {
        String token = StringUtils.removeCharacter(rawToken, '-');
        if(token.isEmpty() || !StringUtils.hasDigitsOnly(token)) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        boolean valid = LuhnAlgo.validate(token);
        ValidatorResponse data = ValidatorResponse.builder().valid(valid).build();
        return new ResponseEntity<>(data, HttpStatus.OK);
    }
}
