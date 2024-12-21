type TFadeInOutAnimationParams = {
  enter_duration: number,
  exit_duration: number
}

export function fadeInOut({
  enter_duration,
  exit_duration
}: TFadeInOutAnimationParams) {
  return {
    initial:{
      opacity:0
    },
    animate:{
      opacity:1
    },
    exit:{
      opacity:0,
      transition:{
        duration:exit_duration
      }
    },
    transition:{
      duration:enter_duration
    }
  }
}