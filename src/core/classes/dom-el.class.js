function getNodeFromTarget(target) {
    if ( target instanceof DomEl ) {
        return target.node;
    } else {
        return target;
    }
}

const usesValueAttrAsText = {
    input: true,
    textarea: true
};

export class DomEl {
    constructor(tag) {
        this.node = document.createElement(tag);
        this.isUsesValueAttrAsText = usesValueAttrAsText[tag.toLowerCase()] || false;
    }

    destroy() {
        this.node.destroy();
        delete this.node;
        delete this.isUsesValueAttrAsText;
    }

    cls(str) {
        this.node.className = str;
        return this;
    }

    attr(data) {
        if (typeof(data) === 'object') {
            for ( let k in data ) {
                this.node.setAttribute(k, data[k]);
            }
            return this;
        }  else {
            return this.node.getAttribute(data);
        }
    }

    hide() {
        this.node.classList.add('hidden');
        return this;
    }
    show() {
        this.node.classList.remove('hidden');
        return this;
    }

    disable() {
        this.node.setAttribute('disabled', true);
        return this;
    }
    enable() {
        this.node.removeAttribute('disabled');
        return this;
    }

    attachTo(target) {
        getNodeFromTarget(target).appendChild(this.node);
        return this;
    }

    detach() {
        if ( this.node.parentNode ) {
            this.node.parentNode.removeChild(this.node);
        }
    }

    cr(tag) {
        return new DomEl(tag).attachTo(this);
    }

    getValue() {
        if ( this.isUsesValueAttrAsText ) {
            return this.node.value;
        }
        return this.node.textContent;
    }

    value(value) {
        if ( this.isUsesValueAttrAsText ) {
            this.node.value = value;
        } else {
            this.node.textContent = value;
        }
        return this;
    }


    appendChild(target) {
        this.node.appendChild(getNodeFromTarget(target));
        return this;
    }

    removeChild(target) {
        let targetNode = getNodeFromTarget(target);
        if ( targetNode.parentNode === this.node ) {
            this.node.removeChild(targetNode);
        }
        return this;
    }

    addEventListener(evName, worker) {
        this.node.addEventListener(evName, worker);
        return this;
    }
}
