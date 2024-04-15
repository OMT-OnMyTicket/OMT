// package twoman.omt.api.support;

// import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// import org.springframework.security.core.authority.SimpleGrantedAuthority;
// import org.springframework.security.core.context.SecurityContext;
// import org.springframework.security.core.context.SecurityContextHolder;
// import org.springframework.security.test.context.support.WithSecurityContextFactory;
// import twoman.omt.api.annotations.WithMockUserCustom;
// import twoman.omt.api.entity.user.User;
// import twoman.omt.oauth.entity.ProviderType;
// import twoman.omt.oauth.entity.RoleType;
// import twoman.omt.oauth.entity.UserPrincipal;

// import java.util.Collections;

// public class WithMockUserCustomSecurityContextFactory implements WithSecurityContextFactory<WithMockUserCustom> {

//     @Override
//     public SecurityContext createSecurityContext(WithMockUserCustom annotation) {
//         User user = new User(
//                 annotation.id(),
//                 "tester",
//                 "tester@testet.com",
//                 "NO_PASS",
//                 "Y",
//                 "qwydhywh",
//                 ProviderType.GOOGLE,
//                 RoleType.USER
//         );
//         user.setUserSeq(annotation.userSeq());

//         UserPrincipal userPrincipal = new UserPrincipal(
//                 user,
//                 Collections.singletonList(new SimpleGrantedAuthority(RoleType.USER.getCode()))
//         );

//         UsernamePasswordAuthenticationToken authentication =
//                 new UsernamePasswordAuthenticationToken(
//                         userPrincipal,
//                         "NO_PASS"
//                 );

//         SecurityContext context = SecurityContextHolder.getContext();
//         context.setAuthentication(authentication);

//         return context;
//     }
// }
