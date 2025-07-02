// lib/utils.ts

/**
 * ✅ Tailwind CSS나 className 문자열을 조합할 때 사용하는 유틸리티 함수입니다.
 * 
 * 여러 개의 문자열(className)을 전달받아 유효한 값만 필터링하고 하나의 문자열로 합칩니다.
 * - false, undefined, null은 무시됩니다.
 * - 결과적으로 조건부 className 적용이 가능해집니다.
 * 
 * 예:
 * const isActive = true;
 * cn('base-class', isActive && 'active-class') 
 * → 결과: 'base-class active-class'
 */
export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}