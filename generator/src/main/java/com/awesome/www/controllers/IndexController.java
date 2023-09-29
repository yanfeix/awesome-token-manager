package com.awesome.www.controllers;

import com.awesome.www.models.GeneratorRequestPayload;
import com.awesome.www.models.GeneratorResponse;
import com.awesome.www.utils.StringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.ConstraintViolationException;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/generator")
public class IndexController {
    @PostMapping(value = "/tokens", produces = "application/json")
    @ExceptionHandler({ConstraintViolationException.class, MethodArgumentNotValidException.class})
    public ResponseEntity<?> createToken(
            @RequestBody final GeneratorRequestPayload payload
    ) {
        List<String> digits = payload.getDigits();

        List<String> stringsWithMultipleCharacter = digits.stream().filter(x -> x.length() > 1).collect(Collectors.toList());
        List<String> stringsWithNonDigits = digits.stream().filter(x -> !StringUtils.hasDigitsOnly(x)).collect(Collectors.toList());

        boolean invalidInput = digits.size() == 0 ||
                stringsWithMultipleCharacter.size() > 0 ||
                stringsWithNonDigits.size() > 0 ||
                StringUtils.hasDuplicates(digits);

        if(invalidInput) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        String alphabets = String.join("", digits);
        String token = StringUtils.generateToken(alphabets, 4, 4, "-");

        GeneratorResponse response = GeneratorResponse.builder().token(token).build();

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
}
