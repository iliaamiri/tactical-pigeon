/**
 * This single module is an initiation function which contains infrastructure additional that we will need later on
 * in our application.
 */
export default () => {
    /**
     * This prototype function allows you to push animations to an element without having to worry about removing the
     * previous one. It will handle that for you (well, most of the time).
     *
     * @param animation : Object { className: "css-animation-class" } -> this is the css animation class you wanna push to this element.
     * @param timeoutDuration : number in milliseconds -> this is how much you want to wait before removing the previous existing animation class.
     */
    // HTMLElement.prototype.pushAnimation = function (animation, timeoutDuration = 2000) {
    //     let previousAnimationClassName = this.dataset.previousAnimationClassName;
    //     let pendingAnimationClassName = animation.className;
    //     this.classList.add(pendingAnimationClassName);
    //     setTimeout(() => {
    //         if (previousAnimationClassName)
    //             this.classList.remove(previousAnimationClassName);
    //
    //         this.dataset.previousAnimationClassName = pendingAnimationClassName;
    //     }, timeoutDuration);
    // }

    /**
     * Disables/Enabling clicking on an element.
     * Why did I made a new file and did this?
     *  Well, to answer the first questions: I don't wanna scroll in main.js until my finger dies.
     *  And for the second question: doesn't it look nice? -> element.disableClick() ! or element.enableClick() !
     */
    HTMLElement.prototype.disableClick = function () {
        this.classList.add('currently-not-clickable');
    }
    HTMLElement.prototype.enableClick = function () {
        this.classList.remove('currently-not-clickable');
    }


}