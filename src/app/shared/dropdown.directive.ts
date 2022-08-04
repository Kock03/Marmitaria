import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective{
    @HostBinding('class.show') isOpen = false;

    @HostListener('click') toggleOpoen() {
        this.isOpen = !this.isOpen;
    }
}