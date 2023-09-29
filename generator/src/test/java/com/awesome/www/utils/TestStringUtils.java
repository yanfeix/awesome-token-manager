package com.awesome.www.utils;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.util.Arrays;

public class TestStringUtils {
    @Test
    void generateToken() {
        String result = StringUtils.generateToken("123", 2, 2, "-");
        Assertions.assertEquals(result.length(),5);
        Assertions.assertTrue(result.contains("1") || result.contains("2") || result.contains("3"));
    }

    @Test
    void hasDuplicates() {
        Assertions.assertTrue(StringUtils.hasDuplicates(Arrays.asList("1", "1")));
        Assertions.assertFalse(StringUtils.hasDuplicates(Arrays.asList("1", "2")));
    }

    @Test
    void hasDigitsOnly() {
        Assertions.assertTrue(StringUtils.hasDigitsOnly("123"));
        Assertions.assertFalse(StringUtils.hasDigitsOnly("abc1"));
    }
}
