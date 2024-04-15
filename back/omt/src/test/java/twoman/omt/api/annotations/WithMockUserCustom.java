// package twoman.omt.api.annotations;

// import org.springframework.security.test.context.support.WithSecurityContext;
// import twoman.omt.api.support.WithMockUserCustomSecurityContextFactory;

// import java.lang.annotation.Retention;
// import java.lang.annotation.RetentionPolicy;

// @Retention(RetentionPolicy.RUNTIME)
// @WithSecurityContext(factory = WithMockUserCustomSecurityContextFactory.class)
// public @interface WithMockUserCustom {
//     long userSeq() default 1L;
//     String id() default "tester";
//     String role() default "ROLE_USER";
// }
