package com.awesome.www.utils;

public class StringUtils {
    public static String removeCharacter(String source, char character) {
        return source.replaceAll(String.valueOf(character), "");
    }

    public static boolean hasDigitsOnly(String str) {
        for (int i = 0; i < str.length(); i++) {
            if (str.charAt(i) < '0' || str.charAt(i) > '9') {
                return false;
            }
        }
        return true;
    }
}
