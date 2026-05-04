import { Animated, Easing } from "react-native";

export const animations = {
    fadeIn: (value, duration = 500, delay = 0) => {
        return Animated.timing(value, {
            toValue: 1,
            duration,
            delay,
            useNativeDriver: true,
            easing: Easing.ease,
        });
    },

    fadeOut: (value, duration = 500, delay = 0) => {
        return Animated.timing(value, {
            toValue: 0,
            duration,
            delay,
            useNativeDriver: true,
            easing: Easing.ease,
        });
    },

    slideInUp: (value, duration = 500, delay = 0) => {
        return Animated.timing(value, {
            toValue: 0,
            duration,
            delay,
            useNativeDriver: true,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        });
    },

    slideInDown: (value, duration = 500, delay = 0) => {
        return Animated.timing(value, {
            toValue: 0,
            duration,
            delay,
            useNativeDriver: true,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        });
    },

    slideInLeft: (value, duration = 500, delay = 0) => {
        return Animated.timing(value, {
            toValue: 0,
            duration,
            delay,
            useNativeDriver: true,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        });
    },

    slideInRight: (value, duration = 500, delay = 0) => {
        return Animated.timing(value, {
            toValue: 0,
            duration,
            delay,
            useNativeDriver: true,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        });
    },

    scaleIn: (value, toValue = 1, duration = 500, delay = 0) => {
        return Animated.spring(value, {
            toValue,
            friction: 7,
            tension: 40,
            useNativeDriver: true,
        });
    },

    scalePress: (value, toValue = 0.95) => {
        return Animated.spring(value, {
            toValue,
            friction: 5,
            useNativeDriver: true,
        });
    },

    pulse: (value, loop = true) => {
        const animation = Animated.loop(
            Animated.sequence([
                Animated.timing(value, {
                    toValue: 1.2,
                    duration: 1000,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(value, {
                    toValue: 1,
                    duration: 1000,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
            ])
        );

        if (loop) {
            animation.start();
        }
        return animation;
    },

    shake: (value, distance = 10) => {
        return Animated.sequence([
            Animated.timing(value, {
                toValue: distance,
                duration: 50,
                useNativeDriver: true,
            }),
            Animated.timing(value, {
                toValue: -distance,
                duration: 50,
                useNativeDriver: true,
            }),
            Animated.timing(value, {
                toValue: distance / 2,
                duration: 50,
                useNativeDriver: true,
            }),
            Animated.timing(value, {
                toValue: 0,
                duration: 100,
                useNativeDriver: true,
            }),
        ]);
    },

    animateProgress: (value, toValue, duration = 1500) => {
        return Animated.timing(value, {
            toValue,
            duration,
            easing: Easing.ease,
            useNativeDriver: false, 
        });
    },

    staggerItems: (items, animationCallback, delayPerItem = 100) => {
        const animations = items.map((_, index) => animationCallback(index));
        return Animated.stagger(delayPerItem, animations);
    },

    parallel: (animations) => {
        return Animated.parallel(animations);
    },

    sequence: (animations) => {
        return Animated.sequence(animations);
    },
};

export const useFadeAnimation = (initialValue = 0, duration = 500) => {
    const opacity = new Animated.Value(initialValue);

    const fadeIn = (delay = 0) => {
        animations.fadeIn(opacity, duration, delay).start();
    };

    const fadeOut = () => {
        animations.fadeOut(opacity, duration).start();
    };

    return { opacity, fadeIn, fadeOut };
};

export const useSlideAnimation = (initialValue = 50, direction = 'up') => {
    const translateValue = new Animated.Value(initialValue);

    const slideIn = (delay = 0) => {
        let animation;
        switch (direction) {
            case 'up':
                animation = animations.slideInUp(translateValue, 500, delay);
                break;
            case 'down':
                animation = animations.slideInDown(translateValue, 500, delay);
                break;
            case 'left':
                animation = animations.slideInLeft(translateValue, 500, delay);
                break;
            case 'right':
                animation = animations.slideInRight(translateValue, 500, delay);
                break;
            default:
                animation = animations.slideInUp(translateValue, 500, delay);
        }
        animation.start();
    };

    return { translateValue, slideIn };
};

export const useScaleAnimation = (initialValue = 0.8) => {
    const scale = new Animated.Value(initialValue);

    const scaleIn = () => {
        animations.scaleIn(scale).start();
    };

    const scalePress = (toValue = 0.95) => {
        animations.scalePress(scale, toValue).start();
    };

    const scaleReset = () => {
        animations.scalePress(scale, 1).start();
    };

    return { scale, scaleIn, scalePress, scaleReset };
};

export const AnimatedPressable = ({ children, onPress, scaleTo = 0.95 }) => {
    const scaleAnim = new Animated.Value(1);

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: scaleTo,
            friction: 5,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 5,
            useNativeDriver: true,
        }).start();
    };

    return (
        <TouchableOpacity
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={onPress}
            activeOpacity={0.9}
        >
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                {children}
            </Animated.View>
        </TouchableOpacity>
    );
};