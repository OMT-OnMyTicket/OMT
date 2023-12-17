package twoman.omt.api.support;
@FunctionalInterface
public interface ResultActionsWithUserFunction<T,R> {
    R apply(T withUser);
}
