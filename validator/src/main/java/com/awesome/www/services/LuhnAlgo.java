package com.awesome.www.services;

public class LuhnAlgo {
    public static boolean validate(String digits) {
        int length = digits.length();

        int checkDigit = digits.charAt(length -1) - '0';
        String payload = digits.substring(0, length-1);

        int total = 0;
        boolean isSecond = true;

        for (int i = payload.length() - 1; i >= 0; i--)
        {
            int val = digits.charAt(i) - '0';

            if (isSecond == true) {
                val = val * 2;
                if(val > 9) {
                    val = (val % 10) + 1;
                }
            }

            total += val;
            isSecond = !isSecond;
        }

        int expectedDigit = 10 - total % 10;
        return (checkDigit == expectedDigit);
    }
}
