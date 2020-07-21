function statusIcon(status) {
  if (status.indexOf('entregue ao destinatário') !== -1) {
    return 'check-circle'
  } else if (status.indexOf('encaminhado') !== -1) {
    return 'truck'
  } else if (status.indexOf('saiu para entrega') !== -1) {
    return 'package'
  } else if (status.indexOf('postado') !== -1) {
    return 'map-pin'
  } else {
    return 'alert-circle'
  }
}

export default statusIcon
